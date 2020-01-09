file = File.new("authors.out", "w")

file.puts "William Shakespeare"
file.puts "Agatha Christie"
file.puts "Barbara Cartland"

file.close

puts File.read("authors.out")

file = File.new("authors.out", "a")
file.puts "Danielle Steel"
file.close
puts File.read("authors.out")



file = File.new("authors_info.out", "w")

file.puts "William Shakespeare, English, plays and poetry, 4 billion"
file.puts "Agatha Christie, English, who done its, 4 bittion"
file.puts "Barbara Cartland, English, romance novels, 1 billion"
file.puts "Danielle Steel, English, romance novels, 800 million"
file.close

File.open("authors_info.out") do |record|
	record.each do |item|
		name, lang, specialty, sales = item.chomp(',')

		puts "#{name} as a #{lang} author that specialized in #{specialty}. They sold over #{sales} books"
	end
end
