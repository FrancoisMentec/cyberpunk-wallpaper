class Sky {
    constructor ({
        width,
        ground_level
    }) {
        let orbiter_speed = 0.005

        this.sun = new Orbiter({
            orbit_center_x: canvas.width / 2,
            orbit_center_y: ground_level,
            orbit_radius: Math.min(width / 2 - 40, ground_level - config.sky.sun_radius - 20),
            starting_angle: Math.PI,
            speed: orbiter_speed,
            fill: config.sky.sun_fill,
            radius: config.sky.sun_radius
        })

        this.moon = new Orbiter({
            orbit_center_x: canvas.width / 2,
            orbit_center_y: ground_level,
            orbit_radius: Math.min(canvas.width / 2 - 80, ground_level - config.sky.moon_radius - 20),
            starting_angle: 0,
            speed: orbiter_speed,
            fill: config.sky.moon_fill,
            radius: config.sky.moon_radius
        })

        this.stars = []
        for (let i = 0; i < width * ground_level / 1000; i++)
            this.stars.push(new Star({
                width,
                height: ground_level
            }))
    }

    draw ({
        ctx,
        canvas,
        scene
    }) {
        this.sun.angle = ((scene.time - SUNRISE) / SECONDS_IN_A_DAY) * Math.PI * -2 + Math.PI
        this.moon.angle = ((scene.time - SUNRISE + SECONDS_IN_A_DAY / 2) / SECONDS_IN_A_DAY) * Math.PI * -2 + Math.PI

        // Background
        let sky_color = scene.is_day
            ? color_fusion(config.sky.night_sky, config.sky.day_sky, scene.luminosity)
            : config.sky.night_sky
        let sky_gradient = [sky_color.multiply(1.5), sky_color.multiply(1.2), sky_color]
        if (scene.is_dawn)
            sky_gradient.push(color_fusion(sky_color, config.sky.dawn_sky, normal((scene.time - SUNRISE) * 4 / SECONDS_IN_AN_HOUR - 4, 1, 0) * 2.5))
        else if (scene.is_dusk)
            sky_gradient.push(color_fusion(sky_color, config.sky.dusk_sky, 
                normal((scene.time - (SUNSET - 2 * SECONDS_IN_AN_HOUR)) * 4 / SECONDS_IN_AN_HOUR - 4, 1, 0) * 2.5))
        else sky_gradient.push(sky_color)
        fill_rect(ctx, 0, 0, canvas.width, scene.ground_level, sky_gradient, 'top', 'bottom')

        // Stars
        if (scene.is_night) {
            let stars_alpha = 1
            if (scene.time >= SUNRISE - 2 * SECONDS_IN_AN_HOUR && scene.time <= SUNRISE)
                stars_alpha = -1 * (scene.time - (SUNRISE - 2 * SECONDS_IN_AN_HOUR)) / (2 * SECONDS_IN_AN_HOUR) + 1
            else if (scene.time >= SUNSET && scene.time <= SUNSET + 2 * SECONDS_IN_AN_HOUR)
                stars_alpha = (scene.time - SUNSET) / (2 * SECONDS_IN_AN_HOUR)
                
            this.stars.forEach(star => star.draw({
                ...arguments[0],
                alpha: stars_alpha
            }))
        }

        // Sun & Moon
        this.sun.draw(arguments[0])
        this.moon.draw(arguments[0])
    }
}