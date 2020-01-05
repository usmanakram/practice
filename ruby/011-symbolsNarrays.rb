# Symbols inside of ruby are basically strings that cannot be changed
# We normally use them to either conserve memory or to speed string comparison

:derek

puts :derek
puts :derek.to_s
puts :derek.class
puts :derek.object_id


# Arrays

# To create an array
array_1 = Array.new
# with predefined length
array_2 = Array.new(5)
# with default value
array_3 = Array.new(5, "empty")
# To create an array by actually passing value
array_4 = [1, "two", 3, 5.5]

puts array_1
puts array_2
puts array_3
puts array_4

# To get stored value inside array
puts array_4[2]

# We can get multiple values as well
# First argument is starting index and the second is output length
puts array_4[2, 2]
# To get values by passing indexes
puts array_4.values_at(0, 1, 2)
# Also we can join the result as a comma separated string
puts array_4[2, 2].join(", ")


# To add a value in the beginning of an array
array_4.unshift("first index value")
# To remove first index
array_4.shift()

# To add value/values to the end
array_4.push(100, 200)
# To remove last index
array_4.pop


# To cancat an array at the end
array_4.concat([10, 20, 30])


# To get array size
puts "Array Size: " + array_4.size().to_s

# To search a value in array
puts "Array Conntains 100: " + array_4.include?(100).to_s
puts "How many 100s: " + array_4.count(100).to_s

# To check if array empty
puts "Array Empty: " + array_4.empty?.to_s


# We can use "p" to print out an array
p array_4

# To print array in loop
array_4.each do |value|
	puts value
end