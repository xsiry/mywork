# Load the rails application
require File.expand_path('../application', __FILE__)

require 'nokogiri'
require 'open-uri'
require 'mechanize'

# Initialize the rails application
Ninja::Application.initialize!

