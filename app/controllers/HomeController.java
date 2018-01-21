package controllers;

import models.Person;
import play.libs.Json;
import play.mvc.*;

import views.html.*;

import java.util.List;

public class HomeController extends Controller {

    public Result index() {
        return ok(index.render());
    }

    public Result person() {
        List<Person> personList = Person.finder.all();
        return ok(Json.toJson(personList));
    }
}
