class Tall_Building extends Building {
    constructor (params) {
        super(params)

        this.make_part({
            width: random_int(30, 60),
            height: random_int(150, 250),
        })

        this.make_part({
            width: Math.round(this.parts[0].width * random(.6, .8)),
            height: random_int(8, 16),
        })
    }
}