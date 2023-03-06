export const useStripAll = (string) => {
    const strip = (string) => {
        const stripped = string?.replaceAll('.', '').replaceAll('-', '').replaceAll('(', '').replaceAll(')', '').replaceAll(' ', '')

        return stripped
    }

    return strip
}