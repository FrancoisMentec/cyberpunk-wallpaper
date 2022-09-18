class Sky {
    constructor ({
        width,
        ground_level
    }) {
        let orbiter_speed = 0.005

        this.sun = new Orbiter({
            orbit_center_x: canvas.width / 2,
            orbit_center_y: ground_level,
            orbit_radius: Math.min(width / 2 - 40, ground_level - config.sun_radius - 20),
            starting_angle: Math.PI,
            speed: orbiter_speed,
            fill: config.sun_fill,
            radius: config.sun_radius
        })

        this.moon = new Orbiter({
            orbit_center_x: canvas.width / 2,
            orbit_center_y: ground_level,
            orbit_radius: Math.min(canvas.width / 2 - 80, ground_level - config.moon_radius - 20),
            starting_angle: 0,
            speed: orbiter_speed,
            fill: config.moon_fill,
            radius: config.moon_radius
        })

        this.stars = []
        for (let i = 0; i < width * ground_level / 1000; i++)
            this.stars.push(new Star({
                width,
                height: ground_level
            }))
        
        this.make_stars_image()
    }

    async make_stars_image () {
        stars_ctx.fillStyle = 'transparent'
        stars_ctx.clearRect(0, 0, stars_canvas.width, stars_canvas.height)
        this.stars.forEach(star => star.draw({
            ctx: stars_ctx,
            alpha: 1
        }))
        this.stars_image = await createImageBitmap(stars_canvas, 0, 0, stars_canvas.width, stars_canvas.height)
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
            ? color_fusion(config.night_sky, config.day_sky, scene.luminosity)
            : config.night_sky
        fill_rect(ctx, 0, 0, canvas.width, scene.ground_level, [sky_color.multiply(1.5), sky_color], 'top', 'bottom')
        
        // Twilight
        if (scene.is_dawn)
            fill_rect(ctx, 0, scene.ground_level - config.dawn_height, canvas.width, config.dawn_height,
                [sky_color.alpha(0), config.dawn_sky.alpha(normal((scene.time - SUNRISE) * 4 / SECONDS_IN_AN_HOUR - 4, 1, 0) * 2.5)], 'top', 'bottom')
        else if (scene.is_dusk)
            fill_rect(ctx, 0, scene.ground_level - config.dusk_height, canvas.width, config.dusk_height,
                [sky_color.alpha(0), config.dusk_sky.alpha(
                    normal((scene.time - (SUNSET - 2 * SECONDS_IN_AN_HOUR)) * 4 / SECONDS_IN_AN_HOUR - 4, 1, 0) * 2.5)], 'top', 'bottom')

        // Stars
        if (scene.is_night) {
            if (scene.time >= SUNRISE - 2 * SECONDS_IN_AN_HOUR && scene.time <= SUNRISE)
                ctx.globalAlpha = -1 * (scene.time - (SUNRISE - 2 * SECONDS_IN_AN_HOUR)) / (2 * SECONDS_IN_AN_HOUR) + 1
            else if (scene.time >= SUNSET && scene.time <= SUNSET + 2 * SECONDS_IN_AN_HOUR)
                ctx.globalAlpha = (scene.time - SUNSET) / (2 * SECONDS_IN_AN_HOUR)
            ctx.drawImage(this.stars_image, 0, 0)
            ctx.globalAlpha = 1
        }

        // Sun & Moon
        this.sun.draw(arguments[0])
        this.moon.draw(arguments[0])
    }
}