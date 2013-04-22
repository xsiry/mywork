FileUtils.mkdir_p(Rails.root.join('tmp/captcha'))

SimpleCaptcha.setup do |sc|
  # default: 100x28
  #sc.image_size = '120x40'

  # default: 5
  sc.length = 4

  # default: simply_blue
  # possible values:
  # 'embosed_silver',
  # 'simply_red',
  # 'simply_green',
  # 'simply_blue',
  # 'distorted_black',
  # 'all_black',
  # 'charcoal_grey',
  # 'almost_invisible'
  # 'random'
  #sc.image_style = 'simply_green'
  
  sc.image_style = 'mycaptha'
  sc.add_image_style('mycaptha', [ "-background '#dfe9f6'",
                                   "-fill 'red'",
                                   "-border 0",
                                   "-bordercolor '#dfe9f6'"])

  # default: low
  # possible values: 'low', 'medium', 'high', 'random'
  #sc.distortion = 'medium'

  #sc.image_magick_path = '/usr/bin' # you can check this from console by running: which convert

  sc.tmp_path = Rails.root.join('tmp/captcha').to_s # or somewhere in project eg. Rails.root.join('tmp/simple_captcha').to_s, 
                       # make shure directory exists
end
