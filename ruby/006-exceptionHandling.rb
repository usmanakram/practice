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


# We can also throw our own exception with "raise"
age = 12
def check_age(age)
	raise ArgumentError, "Enter Positive Number" unless age > 0
end

begin
	# check_age(-1)
	check_age(gets.to_i)
rescue ArgumentError
	puts "That is an impossible age"
end
