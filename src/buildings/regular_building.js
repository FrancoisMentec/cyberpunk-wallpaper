class Regular_Building extends Building {
    constructor (params) {
        super(params)

        this.make_part({
            width: random_int(30, 100),
            height: random_int(20, 60),
        })
    }
}