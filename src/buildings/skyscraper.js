class Skyscraper extends Building {
    constructor (params) {
        super(params)

        this.make_part({
            width: random_int(20, 40),
            height: random_int(300, 450),
        })

        if (random() > .5) {
            this.make_part({
                width: random_int(10, this.parts[0].width * .8),
                height: random_int(8, 16),
            })
    
            if (random() > .5) this.make_part({
                width: random_int(3, clamp(this.parts[1].width * .3, 3, 10)),
                height: random_int(10, 30),
            })
        }
    }
}