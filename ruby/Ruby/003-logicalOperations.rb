# Logical operations
# Comparison: == != < > <= >=
# Logical: && || ! and or not
puts "true && false = " + (true && false).to_s
puts "true || false = " + (true || false).to_s
puts "!false = " + (!false).to_s
puts "5 <=> 10 = "  + (5 <=> 10).to_s

# There are a bunch of different ways to compare

age = 12
# Example # 1
if (age >= 5) && (age <= 6)
	puts "You're in Kindergarten"
elseif (age >= 7) && (age <= 13)
	puts "You're in Middle School"
	puts "Yeah"
else
	puts "Stay Home"
end

# Example # 2
unless age > 4
	puts "No School"
else
	puts "Go to School"
end

# Example # 3
puts "You'r Young" if age < 30

# Example # 4
print "Enter Greeting: "
greeting = gets.chomp

case greeting
when "French", "french"
	puts "Bojour"
	exit
when "Spanish", "spanish"
	puts "Hola"
	exit
else
	puts "Hello"
end

# Example # 5
puts (age >= 40) ? "Old" : "Young"