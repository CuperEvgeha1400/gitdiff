type mode = Record<string, boolean>
interface Args {
    mode: mode
    classes: string[]
    cls: string
}

export const useClassName = ({ mode, classes, cls }: Args): string => {
    return [
        cls,
        ...Object.entries(mode).filter((element) => element[1]).map((element) => element[0]),
        ...classes
    ].join(' ')
}
