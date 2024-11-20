export const F = {
    E: 'pics/tiles/empty.png',
    M: 'pics/tiles/mountain.png',
    O : 'pics/tiles/oasis.png',
    B: 'pics/tiles/bridge.png',
    M_90: 'pics/tiles/mountain_90.png',
    M_180: 'pics/tiles/mountain_180.png',
    M_270: 'pics/tiles/mountain_270.png',
    B_90: 'pics/tiles/bridge_90.png',
    B_180: 'pics/tiles/bridge_180.png',
    B_270: 'pics/tiles/bridge_270.png',
}

export const EASY = {
    1 : [
        [F.E, F.M_90, F.E, F.E, F.O],
        [F.E, F.E, F.E, F.B, F.O],
        [F.B, F.E, F.M_180, F.E, F.E],
        [F.E, F.E, F.E, F.O, F.E],
        [F.E, F.E, F.M_270, F.E, F.E]
    ],
    2 : [
        [F.O, F.E, F.B_270, F.E, F.E],
        [F.E, F.M_180, F.E, F.E, F.M_180],
        [F.B, F.O, F.M_270, F.E, F.E],
        [F.E, F.E, F.E, F.O, F.E],
        [F.E, F.E, F.E, F.E, F.E]
    ],
    3 : [
        [F.E, F.E, F.B_270, F.E, F.E],
        [F.E, F.E, F.E, F.E, F.B_180],
        [F.E, F.M_180, F.B, F.E, F.E],
        [F.E, F.O, F.E, F.E, F.E],
        [F.E, F.B_270, F.E, F.E, F.M_180]
    ],
    4 : [
        [F.E, F.E, F.E, F.B_270, F.E],
        [F.E, F.E, F.E, F.E, F.E],
        [F.B, F.E, F.M_90, F.E, F.M_90],
        [F.E, F.E, F.E, F.E, F.E],
        [F.E, F.E, F.O, F.M_270, F.E]
    ],
    5 : [
        [F.E, F.E, F.B_270, F.E, F.E],
        [F.E, F.M, F.E, F.E, F.E],
        [F.B, F.E, F.E, F.M_270, F.E],
        [F.E, F.E, F.B, F.O, F.E],
        [F.E, F.M_180, F.E, F.E, F.E]
    ],
}

export const HARD = {
    1 : [
        [F.E, F.M_90, F.O, F.O, F.E, F.B_270, F.E],
        [F.B, F.E, F.E, F.E, F.E, F.E, F.E],
        [F.E, F.E, F.B, F.E, F.E, F.E, F.E],
        [F.E, F.E, F.E, F.M_270, F.E, F.E, F.E],
        [F.M_270, F.E, F.M_90, F.E, F.B_270, F.E, F.O],
        [F.E, F.E, F.E, F.E, F.E, F.E, F.E],
        [F.E, F.E, F.E, F.B_270, F.E, F.E, F.E],
    ],
    2 : [
        [F.E, F.E, F.O, F.E, F.E, F.E, F.E],
        [F.B, F.E, F.B_270, F.E, F.E, F.M_180, F.E],
        [F.E, F.E, F.B_270, F.E, F.E, F.E, F.B],
        [F.M, F.E, F.E, F.E, F.E, F.E, F.E],
        [F.E, F.O, F.E, F.M_90, F.E, F.E, F.E],
        [F.E, F.M, F.E, F.E, F.E, F.E, F.E],
        [F.E, F.E, F.O, F.E, F.E, F.E, F.E],
    ],
    3 : [
        [F.E, F.E, F.B_270, F.E, F.E, F.E, F.E],
        [F.E, F.E, F.E, F.E, F.E, F.E, F.B],
        [F.O, F.E, F.M_270, F.E, F.E, F.E, F.E],
        [F.E, F.E, F.E, F.E, F.E, F.E, F.E],
        [F.E, F.O, F.M_270, F.E, F.B_270, F.E, F.E],
        [F.B, F.E, F.E, F.E, F.E, F.M_90, F.E],
        [F.E, F.E, F.O, F.M_270, F.E, F.E, F.E],
    ],
    4 : [
        [F.E, F.E, F.E, F.E, F.E, F.E, F.E],
        [F.E, F.E, F.E, F.B, F.E, F.M_180, F.E],
        [F.E, F.E, F.M_270, F.E, F.E, F.E, F.E],
        [F.E, F.B_270, F.E, F.O, F.E, F.B_270, F.E],
        [F.E, F.E, F.M_180, F.E, F.M_90, F.E, F.E],
        [F.B, F.E, F.E, F.E, F.E, F.M_270, F.E],
        [F.E, F.E, F.E, F.E, F.E, F.E, F.E],
    ],
    5 : [
        [F.E, F.E, F.E, F.E, F.E, F.E, F.E],
        [F.E, F.E, F.E, F.E, F.E, F.M, F.E],
        [F.E, F.B_270, F.B_270, F.E, F.M_90, F.E, F.E],
        [F.E, F.E, F.E, F.E, F.E, F.E, F.E],
        [F.E, F.E, F.M, F.E, F.O, F.E, F.E],
        [F.E, F.M_180, F.E, F.B, F.E, F.E, F.E],
        [F.E, F.E, F.E, F.E, F.E, F.E, F.E],
    ]
}