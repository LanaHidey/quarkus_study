package org.acme.hibernate.orm.panache;

import io.quarkus.hibernate.reactive.panache.PanacheEntity;

import javax.persistence.Cacheable;
import javax.persistence.Column;
import javax.persistence.Entity;
import java.util.Date;


@Entity
@Cacheable
public class Student extends PanacheEntity {


    @Column(length = 40, unique = true)
    public Integer studentCardNumber;
    @Column(length = 40)
    public String firstName;
    @Column(length = 40)
    public String lastName;
    @Column(length = 40)
    public String surname;
    @Column(length = 40)
    public String groupId;
    @Column(length = 40)
    public String faculty;
    @Column(length = 40)
    public Integer course;

}
