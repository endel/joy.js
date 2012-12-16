require 'open3'

guard :shell do
  watch(/^lib\/.*\.js$/) do |m|
    puts m[0] + " has changed, let's build."
    _, stdout, stderr = Open3.popen3("grunt")
    puts stdout.read
  end

  watch(/^test\/.*\.js$/) do |m|
    puts m[0] + " has changed, let's test."

    _, stdout, stderr = Open3.popen3("grunt test")
    puts stdout.read
  end
end
