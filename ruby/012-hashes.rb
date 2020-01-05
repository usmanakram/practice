# Hashes are similar to array but key value pairs

number_hash = { "PI" => 3.14, "Golden" => 1.618, "e" => 2.718 }

puts number_hash["PI"]

superheroes = Hash["Clark Kent", "Superman", "Bruce Wayne", "Batman"]
puts superheroes["Clark Kent"]

superheroes["Barry Allen"] = "Flash"

# We can also add default key value inside Hash
samp_hash = Hash.new("No Such Key")
puts samp_hash["Dog"]

# To combine Hashes
superheroines = Hash["Lisa Morel", "Aquagirl", "Betty Kane", "Batgirl"]
# .update() considered a destructive merge which means if there is any duplicate, will be eliminated
superheroes.update(superheroines);
# .merge() considered a non-destructive merge which keep every key & value even if they match
superheroes.merge(superheroines);

superheroes.each do |key, value|
	puts key.to_s + " : " + value
end

puts "Has Key Lisa Morel: " + superheroes.has_key?("Lisa Morel").to_s
puts "Has Value Batman: " + superheroes.has_value?("Batman").to_s
puts "Is Hash Empty: " + superheroes.empty?.to_s
puts "Size of Hash: " + superheroes.size.to_s

superheroes.delete("Barry Allen")
p superheroes