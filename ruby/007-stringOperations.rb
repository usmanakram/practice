# Interpolation will work in double quotes, not in single quotes
puts "Add them #{4 + 5}\n\n" # Add them 9
puts 'Add them #{4 + 5}\n\n' # Add them #{4 + 5}\n\n


multiline_string = <<EOM
This is a very long string
that contains interpolation
like #{4 + 5} \n\n
EOM

puts multiline_string

first_name = "Darek"
last_name = "Banas"
full_name = first_name + last_name

middle_name = "Justin"

# combine string using interpolation
full_name = "#{first_name} #{middle_name} #{last_name}"

# To check, if string contains string
puts full_name.include?("Justin")

# To get number of characters inside string
puts full_name.size

# To get number of Vowels inside string
puts "Vowels: " + full_name.count("aeiou").to_s

# To get number of Consonants inside string
puts "Consonants: " + full_name.count("^aeiou").to_s

# To check if a string starts with another string
puts full_name.start_with?("Banas")

# To get index of substring
puts "Index: " + full_name.index("Banas").to_s

# to check Equality
puts "a == a: " + ("a" == "a").to_s

# To check if two objects are exactly same
puts "\"a\".equal?(\"a\"): " + ("a".equal?"a").to_s

puts first_name.equal?first_name

puts full_name.upcase
puts full_name.downcase
puts full_name.swapcase

# To eleminate white spaces
full_name = "         " + full_name
full_name = full_name.lstrip
full_name = full_name.rstrip
full_name = full_name.strip


puts full_name.rjust(20, '.')
puts full_name.ljust(20, '.')
puts full_name.center(20, '.')


# To chop of last character
puts full_name.chop

# By default, "chomp" eleminite new line if exist
# We can also pass string to eleminite from string
puts full_name.chomp('as')

# To delete a specific character
puts full_name.delete('a')

puts full_name.split(//)
puts full_name.split(/ /)


# To convert string into
# integer, to_i
# float, to_f
# symbol, to_sym


# Escap sequences
# \\ Backslash
# \' Single-quote
# \" Double-quote
# \a Bell
# \b Backspace
# \f Formfeed
# \n Newline
# \r Carriage
# \t Tab
# \v Vertical tab