class FourDigitYearConverter:
    regex = '[0-9]{4}'

    def to_python(self, value):
        print("yest")
        print(value)
        return int(value)

    def to_url(self, value):
        print("yest")
        print(value)
        return "{:4d}".format(value)

