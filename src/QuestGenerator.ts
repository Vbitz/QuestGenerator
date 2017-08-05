function main(args: string[]): number {
    // tslint:disable-next-line:no-console
    console.log("Hello, World");
    return 0;
}

if (process.mainModule === module) {
    main(process.argv);
}
