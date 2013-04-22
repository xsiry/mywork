# == God config file
# http://god.rubyforge.org/
#

# configure variables list below
app_dir          = "/home/star/Work/ninja/"
service          = "ninja"
num_servers      = 5
port             = 9000
user            = "ninja"
group           = "ninja"
pid_path         = "#{app_dir}tmp/pids/thin.pid"
# god goes below
# =======================================

=begin
God::Contacts::Jabber.defaults do |d|
  d.host     = "talk.google.com"
  d.port     = 5223
  d.from_jid = "monitor.taodi@gmail.com"
  d.password = "bar"
end

God.contact(:jack) do |c|
  c.name   = "jack"
  c.group  = "developers"
  c.to_jid = "himars@gmail.com"
end
=end

(0...num_servers).each do |i|
  # UNIX socket cluster use number 0 to 2 (for 3 servers)
  # and tcp cluster use port number 3000 to 3002.
  number = port + i

  God.watch do |w|
    w.group = "thin-#{service}"
    w.name = w.group + "-#{number}"

    w.interval = 30.seconds

    #w.uid = user
    #w.gid = group
    ext = File.extname(pid_path)
    w.pid_file = pid_path.gsub(/#{ext}$/, ".#{number}#{ext}")

    w.start = "cd #{app_dir}; bundle exec thin start -p #{number} -o #{number} -e production --max-conns 10240 -d"
    w.start_grace = 10.seconds

    w.stop = "cd #{app_dir}; bundle exec thin stop -o #{number}"
    w.stop_grace = 10.seconds
    
    w.restart = "cd #{app_dir}; bundle exec thin restart -p #{number} -o #{number} -e production --max-conns 10240 -d"

    w.behavior(:clean_pid_file)
    
    w.start_if do |start|
      start.condition(:process_running) do |c|
        c.interval = 5.seconds
        c.running  = false
        #c.notify   = 'developers'
      end
    end

    w.restart_if do |restart|
      restart.condition(:memory_usage) do |c|
        c.above  = 150.megabytes
        c.times  = [3,5] # 3 out of 5 intervals
        #c.notify = 'developers'
      end

      restart.condition(:cpu_usage) do |c|
        c.above  = 50.percent
        c.times  = 5
        #c.notify = 'developers'
      end
    end

    w.lifecycle do |on|
      on.condition(:flapping) do |c|
        c.to_state     = [:start, :restart]
        c.times        = 5
        c.within       = 5.minutes
        c.transition   = :unmonitored
        c.retry_in     = 10.minutes
        c.retry_times  = 5
        c.retry_within = 2.hours
        #c.notify       = 'developers'
      end
    end

=begin
    w.transition(:up, :start) do |on|
      on.condition(:process_exits) do |c|
        c.notify = 'developers'
      end
    end
=end
  end # end of God

end
