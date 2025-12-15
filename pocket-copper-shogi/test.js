var a222 = [2,3,4];

const sleepx = (ms) => new Promise(resolve => setTimeout(resolve, ms));


class class1 {
    constructor() {
        this.a = 1;
        this.b = 1;
        this.c = 1;
        this.d = "the const d";

        this.main();
    }

    main() {
       console.log("in main")
       this.fun1(999999);
       this.fun2(4);
       this.fun3(6);
       console.log("ready main exit c is",this.c)
    }

    async onBtn1() {
        await sleepx(5)
        const elem = document.getElementsByClassName("controls")
        console.log (elem.length)
    }

    async onBtn2() {
        await sleepx(5)
        const elem = document.getElementById("btn2")
        // controls is a div and has 1 html chunk that contains 3 buttons

        elem.disabled = true;
        elem.style.backgroundColor = "pink"; 
        console.log("btn 2 disabled maybe?")
    }
    async onBtn3() {
       await sleepx(25)
        var elem = document.getElementsByClassName("controls")
        // does not work on div ... elem.backgroundColor = "blue";

        const elem2 = document.getElementById("btn2")
        // controls is a div and has 1 html chunk that contains 3 buttons

        elem2.disabled = false; 
        elem2.style.backgroundColor = "white";
        console.log("btn 3 color") 
    }

    fun1(parm1) {
        console.log("fun1 begin");
        console.log(this.a, this.b, this.c );
        for (var x = 0; x < parm1; x++) { let nop = 1;}
        this.a = 5;
        await sleepx(12)
        console.log("fun1 end",x);
    }
    
    fun2(parm2) {
        var nop2 = 2222;
        console.log("fun2 begin");
        console.log(this.a, this.b, this.c );
        console.log("nop is",nop2)
        this.b=5
        await sleepx(1)
        console.log("fun2 will now call fun3")
        this.fun3(nop2)
        console.log("fun2 end")
        


    }

    fun3(parm3) {
        console.log("fun3 begin parm set at ",parm3);
        console.log(this.a, this.b, this.c );
        this.c=5
        await sleepx(1)
        console.log("fun3 end")
        

    }
    
}

const myclass = new class1;
 
console.log("script bottom", a222);