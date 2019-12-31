# Print statement
print "Enter a Value: "
# Taking arguments as an integer
first_num = gets.to_i

print 'Enter another value: '
second_num = gets.to_i

# Concatination & printing after converting to string
puts first_num.to_s + ' + ' + second_num.to_s + ' = ' + 
(first_num + second_num).to_s


# Every single thing inside Ruby is an object
puts 1.class
puts 1.234.class
puts 'A string'.class


# Constant starts with an upper case letter
# We can change constat value, but it will give error and code executes
A_CONSTANT = 31.4
A_CONSTANT = 1.6

puts A_CONSTANT


=begin
Multi
line
comments
=end
