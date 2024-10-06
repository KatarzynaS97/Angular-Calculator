import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { evaluate, parse } from 'mathjs';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  display: string = '';
  numbers: number[] = [1,2,3,4,5,6,7,8,9,0];

  addToDisplay(value: string): void {
    this.display += value;
  }
  clearDisplay() {
    this.display = '';
  }
    // calculate(){
    //   try{
    //     this.display= eval(this.display);
    //   }
    //   catch(e){
    //     this.display = "Error";
    //   }
    // }


  calculate() {
    try {
      this.display = this.evaluateExpression(this.display).toString();
    } catch (e) {
      this.display = 'Error';
    }
  }
  evaluateExpression(expression: string): number {
    //usuń białe znaki
    expression = expression.replace(/\s+/g, '');
    //1. Najpierw wykonaj mnożenie i dzielenie
    const processMultiplicationAndDivision = (exp: string): string => {
      const parts = exp.split(/([+\-])/); //DZIEL NA PODSTAWIE + i -
      console.log(parts);
      for (let i = 0; i < parts.length; i++) {
        if (parts[i].includes('*') || parts[i].includes('/')) {
          let subParts = parts[i].split(/([*/])/);
          let resoult = parseFloat(subParts[0]);

          for (let j = 1; j < subParts.length; j += 2) {
            const operator = subParts[j];
            const operand = parseFloat(subParts[j + 1]);

            if (operator === '*') {
              resoult *= operand;
            } else if (operator === '/') {
              if (operand === 0) throw new Error('Nie dziel przez zero');
              resoult /= operand;
            }
          }
          parts[i] = resoult.toString();
        }
      }
      return parts.join('');
    };
    const processAdditionAndSubstracion = (exp: string): number => {
      const parts = exp.split(/([+\-])/);
      let resoult = parseFloat(parts[0]);

      for (let i = 1; i < parts.length; i += 2) {
        const operator = parts[i];
        const operand = parseFloat(parts[i + 1]);
        if (operator === '+') resoult += operand;
        else if (operator === '-') resoult -= operand;
      }
      return resoult;
    };
    const wynik = processMultiplicationAndDivision(expression);
    return processAdditionAndSubstracion(wynik);
  }
}

