declare module 'svg-partial-circle' {
    function partialCircle(
        cx: number,
        cy: number,
        radius: number,
        startAngle: number,
        endAngle: number,
    ): [
        ['M', number, number],
        ['A', number, number, 0, number, number, number, number]
    ];

    export default partialCircle;
}
