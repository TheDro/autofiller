require 'digest'

# generate chrome extension id from the path of the unpacked extension
def get_chrome_extension_id(path)
  m = Digest::SHA256.new
  m.update(path.encode('utf-8'))
  m.hexdigest.chars.map { |i| (i.hex + 'a'.ord).chr }.first(32).join
end