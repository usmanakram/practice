# File handling
write_handler = File.new("yourSum.out", "w")
write_handler.puts("Random Text").to_s
write_handler.close

data_from_file = File.read("yourSum.out")
puts "Data From File: " + data_from_file


# Load & execute code in another Ruby File
load "rubySecondFile.rb"