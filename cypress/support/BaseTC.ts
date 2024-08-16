export class BaseTC {
    results: IResult = {};
    static getDateForProject(): string {
        return new Date().toISOString().replace(/(\.\d{3})|[^\d]/g, "");
    }
    public initResult(uids: string[]) {
        for (const uid of uids) {
            this.results[uid.split("-")[0]] = [];
        }
    }
    addComment(uid: string, comment = "", screenshot = "") {
        this.results[uid.split("-")[0]].push({ comment: comment, screenshot: screenshot });
    }
    loremIpsum(count: number): string {
        let lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tellus sapien, tempus ut venenatis nec, congue non sem. Sed condimentum commodo sollicitudin. Duis nec mattis justo. Nullam sed ullamcorper libero. Vivamus vel elementum nulla, sed fringilla arcu. Nunc interdum elementum turpis, sed laoreet dolor dictum at. Sed dictum ex tortor, vel mollis lorem tincidunt id. Donec interdum felis eros, quis pulvinar tortor tempor vel. Donec vitae suscipit massa. Nullam et metus id leo ultrices elementum.
      
        Integer et dignissim odio. Pellentesque imperdiet finibus sapien, a tristique eros. Maecenas interdum augue dolor, nec congue turpis finibus a. Curabitur eget eleifend odio, et gravida ligula. Ut tempor, nunc sed vulputate congue, tortor enim bibendum eros, ut eleifend mi dolor vitae nibh. Maecenas sit amet molestie magna, sit amet euismod diam. Nullam varius nisi sed finibus porta.
        
        Phasellus porta posuere risus et placerat. Sed sit amet justo sapien. Aliquam erat volutpat. Nam porta a magna sed bibendum. Donec congue, lorem non fermentum porta, lectus mi eleifend nunc, quis ultricies leo velit sed lorem. Etiam eget lorem sed ex bibendum tincidunt. Aliquam sit amet nisl elit. Cras sem nisi, mollis sit amet faucibus et, iaculis ut nisl. Vivamus lacinia dui metus, vel sodales massa ullamcorper ac. Phasellus sollicitudin dictum feugiat. Integer at ullamcorper mi.
        
        Phasellus at accumsan massa. Duis eget risus consequat, gravida nulla et, elementum mauris. Proin velit mi, maximus ut sollicitudin id, dapibus id ligula. Cras malesuada urna quis magna eleifend, et cursus ipsum blandit. Nullam suscipit vulputate hendrerit. Etiam fringilla euismod ligula, quis tincidunt nibh euismod ullamcorper. Curabitur sed massa eget est sollicitudin malesuada. Integer vel ornare ante. Maecenas pretium fermentum eros dictum consequat. Ut placerat tellus vel sem molestie, sed mattis ante vestibulum. Duis et est ultrices, euismod lectus sed, posuere tortor. Nam venenatis arcu mauris, eget cursus diam facilisis ac. Morbi nisl magna, sodales ut velit in, faucibus pulvinar augue.
        
        Praesent orci dolor, molestie sed turpis sit amet, rhoncus vehicula ligula. Phasellus bibendum nibh quam, sed faucibus ipsum gravida et. In ut erat aliquet, interdum libero ut, tristique sapien. Etiam efficitur mi et neque malesuada mollis. Fusce tempus mauris eu sapien vehicula, sollicitudin lacinia quam maximus. Praesent a gravida mi, sed faucibus sem. Curabitur viverra mi eros, sed venenatis tellus sagittis ut. Etiam posuere scelerisque aliquet. Praesent maximus magna lectus, sed malesuada lorem aliquet non. Curabitur scelerisque tincidunt lectus, et efficitur ipsum posuere quis. Duis pharetra sollicitudin eros eu ullamcorper.`;

        while (lorem.length < count) {
            lorem += lorem;
        }

        return lorem.substring(0, count);
    }
}
export interface IComment {
    screenshot?: string;
    comment?: string;
}
export interface IResult {
    [key: string]: IComment[];
}
