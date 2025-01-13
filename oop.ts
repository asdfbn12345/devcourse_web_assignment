class Employee {
  constructor(
    private _name: string,
    private _age: number,
    private _job: string
  ) {}
  get name() {
    return this._name;
  }

  set job(value: string) {
    this._job = value;
  }

  public print(): void {
    console.log(`이름: ${this._name}\n`);
    console.log(`나이: ${this._age}\n`);
    console.log(`직업: ${this._job}\n`);
  }
}

let employee = new Employee("Kim", 20, "Developer");
employee.print();
