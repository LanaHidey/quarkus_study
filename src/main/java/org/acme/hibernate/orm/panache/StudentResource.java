package org.acme.hibernate.orm.panache;

import io.quarkus.hibernate.reactive.panache.Panache;
import io.quarkus.panache.common.Sort;
import io.smallrye.mutiny.Uni;

import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import java.net.URI;
import java.util.List;

@Path("/students")
@ApplicationScoped
public class StudentResource {
    @GET
    public Uni<List<Student>> get() {
        return Student.listAll(Sort.by("studentCardNumber"));
    }
    @GET
    @Path("/{id}")
    public Uni<Student> getSingle(Long id) {
        return Student.findById(id);
    }

    @POST
    public Uni<Response> create(Student student) {
        return Panache.<Student>withTransaction(student::persist)
                .onItem().transform(inserted -> Response.created(URI.create("/student/" + inserted.id)).build());
    }
}

