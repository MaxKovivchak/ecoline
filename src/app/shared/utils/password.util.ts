export class PasswordUtil {
    static randomPassword(): string {
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        const randomChar = characters.charAt(PasswordUtil.randomNumber(characters.length));

        return `${randomChar}${PasswordUtil.randomNumber(1000000)}${randomChar.toLocaleUpperCase()}`;
    }

    static randomNumber(max): number {
        return Math.floor(Math.random() * max) + 1;
    }
}
