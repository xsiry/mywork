namespace :assets do

  desc "Check that all assets have valid encoding"
  task  :check => :environment do
    paths = ["app/assets", "lib/assets", "vendor/assets"]

    paths.each do |path|
      dir_path = Rails.root + path

      if File.exists?(dir_path)
        dir_files = File.join(dir_path, "**")

        Dir.glob(dir_files + "/**.{js,css}").each do |file|

            # make sure we're not trying to process a directory
            unless File.directory?(file)
              # read the file and check its encoding
              data = File.read(file)
              unless data.valid_encoding?
                puts "#{ file } does not have valid encoding!"
              end
            end

        end # end Dir.glob

      end #end File.exists
    end # end paths.each
  end

end

# min-js: http://coryodaniel.com/index.php/2010/02/10/a-rails-rake-file-for-compressing-your-javascript-with-yui/
# yuicompressor: http://david-burger.blogspot.com/2008/02/minify-rails-javascript-and-css-with.html
namespace :minifier do

  def minify(files)
    files.each do |file|
      file_name_stack = file.split("/")
      if file_name_stack.size > 2
        # app/assets/javascript/a.js -> public/assets/a.js 
        dest_dir  = ["public", "assets", file_name_stack[3..-2]].join("/")
        dest_file = ["public", "assets", file_name_stack[3..-1]].join("/")
        FileUtils.mkdir_p(dest_dir)
        cmd = "java -jar lib/yuicompressor-2.4.7.jar #{file} -o #{dest_file} --charset utf-8"
        puts cmd
        ret = system(cmd)
        raise "Minification failed for #{file}" if !ret
      end
    end
  end

  desc "minify"
  task :minify => [:minify_js, :minify_css]

  desc "minify javascript"
  task :minify_js do
    minify(FileList['app/assets/javascripts/ninja/**/*.js'])
    minify(FileList['app/assets/javascripts/ext-4.1.0/env/*.js'])
    minify(FileList['app/assets/javascripts/ext-4.1.0/ex/**/*.js'])
    minify(FileList['app/assets/javascripts/ext-4.1.0/ux/**/*.js'])
    minify(['app/assets/javascripts/ext-4.1.0/ext-all.js', 
            'app/assets/javascripts/ext-4.1.0/ext-lang-zh_CN.js'])
  end

  desc "minify css"
  task :minify_css do
    #minify(FileList['public/stylesheets/**/*.css'])
    minify(FileList['app/assets/stylesheets/*.css'])
  end

end