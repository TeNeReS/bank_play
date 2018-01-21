package models;

import io.ebean.Finder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;

@EqualsAndHashCode(callSuper = false)
@Data
@NoArgsConstructor
@Entity
public class Person extends BaseEntity {
    private String name;
    private String address;
    private int age;

    public Person(String name, String address, int age) {
        this.name = name;
        this.address = address;
        this.age = age;
    }

    public static Finder<Integer, Person> finder = new Finder<>(Person.class);
}
