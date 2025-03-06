Rails.application.config.after_initialize do
  PaperTrail.config.serializer = YAML

  if defined?(Psych) && Psych.respond_to?(:safe_load)
    permitted_classes = [
      Date, Time, ActiveSupport::TimeWithZone, ActiveSupport::TimeZone,
      Integer, String, Hash, Symbol
    ]

    Psych.singleton_class.prepend(Module.new {
      define_method(:safe_load) do |*args, **kwargs|
        kwargs[:permitted_classes] = (kwargs[:permitted_classes] || []) | permitted_classes
        kwargs[:aliases] = true  # ✅ เปิดใช้งาน aliases
        super(*args, **kwargs)
      end
    })
  end
end
