---
title: How I Test My Kernel
date: 2025-11-18
tags: ["osdev"]
---

# How I Test My Kernel

Every project no matter big or small every project benefits from testing, and
kernel development is no exception. While testing userspace applications
is familiar territory, testing in kernels presents its own challenges, and
oppertunities. In this post we'll explore building a testing framework
inside the kernel, so it becomes easier to maintain.

>**NOTE** This is my first blog post so it might not be that good but at least
it isn'tAI slop

## The Framework

The first thing I do when I implement something new in my projects is always
creating the header file. It helps with getting an overview of the new
feature. Here we first define some data structures that our framework will use:

```c
typedef struct
{
    const char *name;
    const char *group;
    bool failed;

    const char *reason;
    const char *file;
    uint32_t line;
} test_result_t;

typedef void (*test_func_t)(test_result_t *result);

typedef struct
{
    const char *name;
    const char *group;
    test_func_t func;
} test_case_t;
```

Here we create 3 new types:

1. A structure to hold the result from a test.
2. A function-pointer typedef for testing functions.
3. A structure to hold a test case.

We create a macro so we easily can define tests and a function to run all tests:

```c
#define TEST_SECTION __attribute__((section(".testcases"), used))
#define TEST(GROUP, NAME, BODY)                                      \
    static void __test_func_##NAME(test_result_t *result);           \
    static const test_case_t __test_case_##NAME TEST_SECTION = {     \
        .name = #NAME, .group = #GROUP, .func = __test_func_##NAME}; \
    static void __test_func_##NAME(test_result_t *result) BODY

void test_run_all();
```

Lets also just add some defines in case we don't have tests enabled (we'll cover
the macro later).

```c
#ifdef UNIT_TEST_ENABLED

// ...

#else /* UNIT_TEST_ENABLED is not defined */

#define TEST(GROUP, NAME, BODY)

#define test_run_all(...) \
    do                    \
    {                     \
    } while (0)

#endif /* UNIT_TEST_ENABLED */
```

The next thing to consider is how do we find all of the tests? Well, it's pretty
simple. We just add a new `testcases` section to our linker script:

```ruby
.testcases : {
    __start_testcases = .;
    KEEP(*(.testcases))
    __end_testcases = .;
}
```

And then we add the symbols to our source code (`.c` file):

```c
extern const test_case_t __start_testcases[];
extern const test_case_t __end_testcases[];
```

Now lets now implement the functions. I am going to start with `test_run_all`:

```c
void test_run_all()
{
    // First, lets print the total amount of tests
    uint32_t total = (uint32_t)(__end_testcases - __start_testcases);
    kprintf("\nrunning %u %s\n", total, total > 1 ? "tests" : "test");

    uint32_t failed = 0;

    const test_case_t *tc = __start_testcases;
    test_result_t result  = {0};

    // Iterate over all of the cases
    for (; tc < __end_testcases; ++tc)
    {
        test_run_single(&result, tc);
        if (result.failed)
        {
            failed++;
        }
    }

    kprintf("\ntest result: %s. %u passed; %u failed\n",
            failed ? "\033[31mFAILED\033[0m" : "\033[32mok\033[0m",
            total - failed, failed);
}
```

And then running a single test:

```c
void test_run_single(test_result_t *result, const test_case_t *tc)
{
    result->name   = tc->name;
    result->group  = tc->group;
    result->failed = false;
    result->reason = NULL;

    kprintf("%s:%s ...", tc->group, tc->name);
    tc->func(result);
    kprintf(" %s\n", result->failed
        ? "\033[31mFAILED\033[0m" : "\033[32mok\033[0m");
}
```

Now when we run this (with `UNIT_TEST_ENABLED` defined and with `test_run_all`
called somewhere) and a simple test like this:

```c
TEST(sample_tests, sample, {});
```

It should show that a single test has succeded.

## Running QEMU in headless mode

The next thing we want to do is preventing QEMU from opening a window. Because
we do not want to open a window when testing in f. x. a CI workflow. To do that
we simply just need to pass `-nographic` to QEMU.

In my build system I added a new rule called `test` and modified the `kernel`
rule to accept the `KERNEL_TARGET` parameter like this:

```ts
$(call USER_VARIABLE, TEST_QEMUFLAGS, -m 128M -M smm=off -d int -D qemu.log -no-reboot)

kernel:
    $(MAKE) -C kernel $(KERNEL_TARGET)

test: KERNEL_TARGET=test
test: ovmf disk
    qemu-system-$(KARCH) \
        -M q35 \
        -drive if=pflash,unit=0,format=raw,file=ovmf/ovmf-code- \
            $(KARCH).fd,readonly=on \
        -drive if=pflash,unit=1,format=raw,file=ovmf/ovmf-vars- \
            $(KARCH).fd \
        -cdrom $(OUTPUT) \
        -nographic \
        $(TEST_QEMUFLAGS) \
        -device isa-debug-exit,iobase=0xf4,iosize=0x04 \  # // <- We will
            \// explain this later
        || [ $$? -eq 33 ] # // <- We will explain this later
```

And in my kernel `Makefile` i define `UNIT_TEST_ENABLED` if the target is `test`:

```ts
test: override KCPPFLAGS += -DUNIT_TEST_ENABLED
test: clean bin/$(OUTPUT)
```

And if you run it regularly it should not test. And if you run `make test` it
should run all of your tests.

## Exiting QEMU

The last step (at least in this post) is to exit QEMU. Because in a CI workflow
we cannot go in and just kill the QEMU process. So instead we use the ISA-debug
device at port `0xF4` to exit:

```c
#define QEMU_EXIT_SUCCESS 0x10
#define QEMU_EXIT_FAILURE 0x11

void qemu_exit(uint8_t code)
{
    x86_outb(0xf4, code);
}
```

Thanks for reading (this is my first blog post btw)!
