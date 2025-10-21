FROM ruby:3.3.3

RUN gem install bundler
WORKDIR /app
COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY . .
RUN bundle exec middleman build

FROM nginx:alpine

COPY --from=0 /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
