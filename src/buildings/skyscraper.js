class Skyscraper extends Building {
    constructor (params) {
        super(params)

        this.make_part({
            width: random_int(20, 40),
            height: random_int(300, 500),
        })
    }
}