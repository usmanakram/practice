# Loop
x = 1
loop do
	x += 1

	next unless (x % 2) == 0
	puts x

	break if x >= 10
end


# while loop
y = 1
while y <= 10
	y += 1
	next unless (y % 2) == 0
	puts y	
end


# untill loop
a = 1
until a >= 10
	a += 1
	next unless (a % 2) == 0
	puts a		
end

# for in loop
numbers = [1,2,3,4,5]
for number in numbers
	print "#{number}, "
end

# .each
groceries = ["bananas", "potatoes", "pasta", "tomatoes"]
groceries.each do |food|
	puts "Get some #{food}"
end

# 
(0..5).each do |i|
	puts "# #{i}"
end