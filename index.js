/**
 * A class representing a color in the HSV color space.
 */
class Color {
    /**
     * @param {number} h - Hue in degrees (0-360)
     * @param {number} s - Saturation (0-1)
     * @param {number} v - Value (0-1)
     * @example
     * const color = new Color(180, 0.5, 0.5);
     */
    constructor(h, s, v) {
        this.h = h;
        this.s = s;
        this.v = v;
    }

    /**
     * Returns a string representation of the color in the form "hsv(h,s,v)",
     * where h is the hue in degrees, s is the saturation, and v is the value.
     * @returns {string}
     * @example
     * const color = new Color(180, 0.5, 0.5);
     * console.log(color.toString()); // "hsv(180,0.5,0.5)"
     */
    toString() {
        return `hsv(${this.h},${this.s},${this.v})`;
    }

    /**
     * Returns a color that is the complementary color of this color.
     * The complementary color is the color directly across the color wheel
     * from this color.
     * @returns {Color}
     * @example
     * const color = new Color(180, 0.5, 0.5);
     * const comp = color.complementary();
     * console.log(comp.toString()); // "hsv(0,0.5,0.5)"
     */
    complementary() {
        return new Color((this.h + 180) % 360, this.s, this.v);
    }

    /**
     * Returns an array of two colors that are split complementary to this color.
     * Split complementary colors are colors that are adjacent to the complementary
     * color of this color on the color wheel.
     * @returns {Color[]}
     * @example
     * const color = new Color(180, 0.5, 0.5);
     * const splits = color.splitComplementary();
     * console.log(splits.map(c => c.toString())); // ["hsv(150,0.5,0.5)", "hsv(210,0.5,0.5)"]
     */
    splitComplementary() {
        return [
            new Color((this.h + 150) % 360, this.s, this.v),
            new Color((this.h + 210) % 360, this.s, this.v)
        ];
    }

    /**
     * Returns an array of two colors that are triadic to this color.
     * Triadic colors are colors that are equally spaced from this color on the color wheel.
     * @returns {Color[]}
     * @example
     * const color = new Color(180, 0.5, 0.5);
     * const triads = color.triadic();
     * console.log(triads.map(c => c.toString())); // ["hsv(300,0.5,0.5)", "hsv(60,0.5,0.5)"]
     */
    triadic() {
        return [
            new Color((this.h + 120) % 360, this.s, this.v),
            new Color((this.h + 240) % 360, this.s, this.v)
        ];
    }

    /**
     * Returns an array of three colors that are tetradic to this color.
     * Tetradic colors are four colors arranged into two complementary pairs
     * on the color wheel. This method returns the three colors that complete
     * the tetradic scheme based on this color.
     * @returns {Color[]}
     * @example
     * const color = new Color(180, 0.5, 0.5);
     * const tetrads = color.tetradic();
     * console.log(tetrads.map(c => c.toString())); // ["hsv(90,0.5,0.5)", "hsv(0,0.5,0.5)", "hsv(270,0.5,0.5)"]
     */
    tetradic() {
        return [
            new Color((this.h + 90) % 360, this.s, this.v),
            new Color((this.h + 180) % 360, this.s, this.v),
            new Color((this.h + 270) % 360, this.s, this.v)
        ];
    }

    /**
     * Returns an array of n colors that are monochromatic to this color.
     * Monochromatic colors are colors that have the same hue as this color.
     * The colors returned will have the same hue as this color, but with
     * value and saturation increasing or decreasing by the given step size.
     * The value and saturation of the colors will be increased or decreased
     * depending on the value of d.
     * @param {number} n - The number of colors to generate. Defaults to 3.
     * @param {number} d - A number that determines whether the colors will be
     *                     generated in a positive or negative direction. 1
     *                     will generate colors with increasing saturation and
     *                     value, while -1 will generate colors with decreasing
     *                     saturation and value. Defaults to 1.
     * @returns {Color[]}
     * @example
     * const color = new Color(180, 0.5, 0.5);
     * const monochromes = color.monochromatic(3, 1);
     * console.log(monochromes.map(c => c.toString())); // ["hsv(180,0.67,0.67)", "hsv(180,0.83,0.83)", "hsv(180,1,1)"]
     */
    monochromatic(n = 3, d = 1) {
        let colors = [];
        let vStep = d == -1 ? (this.v - 0.2) / n : (1 - this.v) / n;
        let sStep = d == -1 ? (this.s - 0.2) / n : (1 - this.s) / n;

        if (![-1, 1].includes(d)) {
            throw new Error("d must be -1 or 1");
        }
        for (let i = 1; i <= n; i++) {
            let s = this.s + d * sStep * i;
            let v = this.v + d * vStep * i;
            colors.push(new Color(this.h, s, v));
        }

        return colors;
    }

    /**
     * Returns an array of colors that are analogous to this color.
     * Analogous colors are colors that are adjacent to each other on the color wheel.
     * This method generates `n` analogous colors by varying the hue of this color.
     * @param {number} n - The number of analogous colors to generate. Defaults to 3.
     * @returns {Color[]}
     * @example
     * const color = new Color(180, 0.5, 0.5);
     * const analogs = color.analogous(3);
     * console.log(analogs.map(c => c.toString())); // ["hsv(210,0.5,0.5)", "hsv(150,0.5,0.5)", "hsv(120,0.5,0.5)"]
     */
    analogous(n = 3) {
        let colors = [];
        for (let i = 1; i <= Math.round(n / 2); i++) {
            let h = (this.h + 30 * i) % 360;
            colors.push(new Color(h, this.s, this.v));
        }
        for (let i = 1; i <= n - Math.round(n / 2); i++) {
            let h = (this.h - 30 * i) % 360;
            colors.push(new Color(h, this.s, this.v));
        }
        return colors;
    }
}

module.exports = Color;
