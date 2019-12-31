print "Enter a Number: "
first_num = gets.to_i
print "Enter Another Number: "
second_num = gets.to_i

begin
	answer = first_num / second_num

rescue
	puts "You can't divide by zero"
	exit
end

puts "#{first_num} / #{second_num} = #{answer}"