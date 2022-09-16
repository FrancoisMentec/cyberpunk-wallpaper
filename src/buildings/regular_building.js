class Regular_Building extends Building {
    constructor (params) {
        super(params)

        this.make_part({
            width: random_int(30, 100),
            height: random_int(20, 60),
        })

        this.make_part({
            width: this.parts[0].total_width,
            height: random_int(2, 5),
            depth: 0,
            windows: false,
            //x_offset: -this.parts[0].depth / 2,
            front_fill: Array.isArray(this.parts[0].side_fill)
                ? this.parts[0].side_fill[0]
                : this.parts[0].side_fill
        })
    }
}