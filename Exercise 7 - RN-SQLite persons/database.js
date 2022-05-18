import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("persons.db");

export function Init() {
    return new Promise((resolve, reject) => {
        database.transaction((tx => {
            tx.executeSql("CREATE TABLE Persons(ID INTEGER PRIMARY KEY NOT NULL, Name TEXT NOT NULL, Email TEXT NOT NULL, Age INTEGER NOT NULL)", [], 
            () => {
                console.log("Success from create table Persons");
                resolve();
            }, 
            (_, error) => {
                console.log("Error from create table Persons");
                console.log(error);
                reject();
            });
        }));
    });
}

export function AddNewPerson(name, email, age)
{
    return new Promise((resolve, reject) => {
        database.transaction((conn) => {
            conn.executeSql("INSERT INTO Persons(Name,Email,Age) VALUES(?,?,?)", [name,email,age], (_, result) => {
                console.log("Result from insert person");
                console.log(result);
                resolve(result);
            },
            (_, error) => {
                console.log("Error from insert person");
                console.log(error);
                reject(error);
            })
        })
    });
}

export function SelectPersonsByName(name) {
    return new Promise ((resolve, reject) => {
        database.transaction((conn) => {
            conn.executeSql(`SELECT * FROM Persons WHERE Name LIKE '%${name}%'`, [], (_, result) => {
                console.log("Result of getting a person by name");
                console.log(result.rows._array);
                resolve(result.rows._array);
            },
            (_, error) => {
                console.log("Error while getting a person by name");
                console.log(error);
                reject(error);
            })
        })
    });
}