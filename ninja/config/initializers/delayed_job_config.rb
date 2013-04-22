Delayed::Worker.destroy_failed_jobs = false    # 失败了把记录保存下来
Delayed::Worker.sleep_delay = 60               # n second再次尝试执行
Delayed::Worker.max_attempts = 10              # 失败了尝试再次的最高次数
Delayed::Worker.max_run_time = 30.minutes      # 最大的执行时间
Delayed::Worker.read_ahead = 20                # 读取任务的个数
Delayed::Worker.delay_jobs = !Rails.env.test?  # 是否delay_job task