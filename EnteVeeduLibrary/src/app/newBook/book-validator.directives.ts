import { Directive } from "@angular/core";
import { FormGroup, Validator, NG_VALIDATORS } from "@angular/forms";

@Directive({
    selector: '[validateBook]',
    providers: [{provide: NG_VALIDATORS, useExisting: validateBook, multi: true}]
})
export class LocationValidator implements Validator {

    validate(formGroup: FormGroup): { [key: string]: any} {

        let bookName = formGroup.controls['bookName'];
        let price = formGroup.controls['price'];

  //      let onlineUrlControl = (<FormGroup>formGroup.root).controls['onlineUrl'];

        if((bookName && bookName.value) && (price && price.value)){
            return {validateBook: true};
        } else {
            return {validateBook: false}
        }

    }
}