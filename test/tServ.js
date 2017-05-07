import supertest from "supertest";
import {server} from  "./../server.js";
import should from "should";

//UNIT Tests begin

describe("Check that Items can be gotten successfully", function(){
	this.timeout(200000);
	
	it("should return JSON", function(done){
	
	supertest(server)
	.get("api/items")
	.expect("Content-type",/json/)
	//result's body is JSON
	.expect(200)
	.end(function(err,res)
	{
	res.status.should.equal(200);
	//result is HTTP
	done();	
	});
	});
	
	//add a new Adventure
	it("should add a new Adventure",function(done){
	supertest(server)
    .post('/api/adventures')
	.send({     "id": "testRoom",
    "text": "This room only exists to test whether the add route works",
    "previous": "",
    "tests": [{}],
    "next": [],
    "statGain": []})
	.expect("Content-type",/json/)
	.expect(201)
	.end(function(err,res){
	  res.status.should.equal(201);
      res.body.adventure.should.have.property('_id');//Adventures also have MongoIDs
	  res.body.adventure.text.should.equal('This room only exists to test whether the add route works');
      done();
	});
	});

	
	//add a new Item
	it("should add a new Item",function(done){
	supertest(server)
    .post('/api/items')
	.send({ "id": "specialPotion",
    "name": "Special Potion",
    "text": "A very special potion",
    "charges": 2,})
	.expect("Content-type",/json/)
	.expect(201)
	.end(function(err,res){
	  res.status.should.equal(201);
      res.body.item.should.have.property('_id');//should have an auto assigned Mongo ID
      res.body.item.name.should.equal('Special Potion');
	  res.body.item.text.should.equal('A very special Potion');
	  res.body.item.charges.should.equal(2);
      done();
	});
	});
	
  it("should add and delete the Death Potion",function(done){

    const superserver = supertest(server);
    superserver
    .get("/api/items")
    .expect("Content-type",/json/)
    .expect(200) 
    .end(function(err,res){
        const id = res.body[0]._id;
        superserver
        .put("/api/items/"+id)
        .send({ "id": "deathPotion",
    "name": "Death Potion",
    "text": "You really don't want to drink this",
    "charges": 3,})
        .expect("Content-type",/json/)
        .expect(200) 
        .end(function(err,res){
            superserver
            .delete("/api/items/"+id)
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                res.body._id.should.equal(id);
                res.body.name.should.equal("Death Potion");
				//checking that the correct Potion was returned from the request
                done();
             }
           );
           }
         );
      });
    });
	
	    it("should delete an item",function(done){
   
      const superserver = supertest(server);
      superserver
      .get("/api/items")
      .expect("Content-type",/json/)
      .expect(200) 
      .end(function(err,res){
          const id = res.body[0]._id;
          superserver
              .delete("/api/items/"+id)
              .expect("Content-type",/json/)
              .expect(200) 
              .end(function(err,res){
                  res.body._id.should.equal(id);
                  res.body.should.have.property("charges");
				  //check that the response has the charges quality, unique to Items
                  done();
               }
             );
             }
           );
      });
});