# Start time 34:24
# Module are made up of classes but cannot be instanciated

require_relative "009-modules/human"
require_relative "009-modules/smart"

module Animal
	def make_sound
		puts "Grrr"
	end
end

class Dog
	include Animal
end

rover = Dog.new
rover.make_sound

class Scientist
	include Human
	# For supersede methods of including class
	prepend Smart

	def act_smart
		return "E = mc^2"
	end
end

einstein = Scientist.new
einstein.name = "Albert"

puts einstein.name

einstein.run

puts einstein.name + " says " + einstein.act_smart