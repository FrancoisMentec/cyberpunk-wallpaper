const BUILDINGS_MAKERS = [
    {
        make: params => new Regular_Building(params),
        weight: 1000
    },
    {
        make: params => new Skyscraper(params),
        weight: 100
    }
]

const WEIGHT = BUILDINGS_MAKERS.reduce((p, c) => p + c.weight, 0)

function make_building (params) {
    let rand = random_int(1, WEIGHT)
    let i = -1
    let sum = 0
    while (sum < rand) sum += BUILDINGS_MAKERS[++i].weight
    return BUILDINGS_MAKERS[i].make(params)
}

class Building {
    constructor ({
        x = 0,
        y = 0,
        front_fill = ['#aa4b6b', '#6b6b83', '#3b8d99'],
        side_fill = ['#e1eec3', '#f05053'],
        windows = true,
        windows_light_color = 'yellow'
    } = {}) {
        this.x = x
        this.y = y
        this.parts = []
        this.front_fill = front_fill
        this.side_fill = side_fill
        this.windows = windows
        this.windows_light_color = windows_light_color

        /*let seed = random()

        if (seed < 0.4) { // Small & large
            this.parts.push(new Building_Part({
                width: random_int(30, 100),
                height: random_int(20, 60),
                windows: windows,
                front_fill: front_fill
            }))
        } else if (seed < 0.8) { // Regular
            this.parts.push(new Building_Part({
                width: random_int(20, 50),
                height: random_int(50, 150),
                windows: windows,
                front_fill: front_fill
            }))
        } else if (seed < 0.95) { // Skyscraper
            this.parts.push(new Building_Part({
                width: random_int(10, 30),
                height: random_int(150, 400),
                windows: windows,
                front_fill: front_fill
            }))
        } else { // Ultra Skyscraper
            this.parts.push(new Building_Part({
                width: random_int(10, 20),
                height: random_int(400, 700),
                windows: windows,
                front_fill: front_fill
            }))
        }*/ 
    }

    get width () {
        return this.parts[0].width
    }

    get total_width () {
        return this.parts[0].total_width
    }

    get height () {
        return this.parts.reduce((sum, part) => sum + part.height, 0)
    }

    make_part (params) {
        this.parts.push(new Building_Part({
            front_fill: this.front_fill,
            side_fill: this.side_fill,
            windows_light_color: this.windows_light_color,
            windows: this.windows,
            ...params
        }))
    }

    draw ({
        ctx,
        canvas,
        scene,
    }) {
        let y = this.y
        for (let part of this.parts) {
            part.draw({
                ...arguments[0],
                x: this.x,
                y: y
            })
            y -= part.height
        }
    }
}

function make_building_layer ({
    width,
    ground_level,
    min_gap = 10,
    max_gap = 50,
} = {}) {
    let x = 0
    let buildings = []
    while (x < width) {
        let building = make_building({
            ...arguments[0],
            x: x + random_int(min_gap, max_gap),
            y: ground_level,
        })
        buildings.push(building)
        x = building.x + building.width 
    }
    return buildings
}