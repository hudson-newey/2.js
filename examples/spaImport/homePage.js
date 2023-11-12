const imageUrl = "https://picsum.photos/200/300";

const homePage = new Component({
    template: `
        <div>
            <h1>Home Page</h1>
            <p>Home page content</p>

            <img src="${imageUrl}" alt="random image" />

            <p>This page demonstrates that we can use completely unrelated templates from other components</p>

            <button>Useless Button</button>
        </div>
    `,
});
