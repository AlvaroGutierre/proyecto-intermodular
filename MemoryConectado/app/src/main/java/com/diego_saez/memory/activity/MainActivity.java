package com.diego_saez.memory.activity;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.diego_saez.memory.R;
import com.diego_saez.memory.adapters.ScoresAdapter;
import com.diego_saez.memory.classes.Scores;
import com.diego_saez.memory.fragments.CardsFFragment;

import org.jetbrains.annotations.NotNull;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import io.realm.Realm;
import io.realm.RealmChangeListener;
import io.realm.RealmResults;

public class MainActivity extends AppCompatActivity {

    Button btnPlay;
    Button btnLevel;
    Button btnCredits;
    String levelText;

    RecyclerView scoreRecycler;
    //Realm realm;
    //RealmResults<Scores> scoresList;
    ArrayList<Scores> scoresList = new ArrayList<>();
    //Scores scoreResponse;
    RequestQueue requestQueue;
    private final String URL = "http://172.30.35.49:8080/scores";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        btnPlay = (Button) findViewById(R.id.btnPlay);
        btnLevel = (Button) findViewById(R.id.btnLevel);
        btnCredits = (Button) findViewById(R.id.btnCredits);

        btnPlay.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent;
                levelText = btnLevel.getText().toString();
                if (levelText == getString(R.string.btn_NivelF)) {
                    intent = new Intent(MainActivity.this, GameFActivity.class);
                    startActivity(intent);
                } else if(levelText == getString(R.string.btn_NivelN)) {
                    intent = new Intent(MainActivity.this, GameNActivity.class);
                    startActivity(intent);
                } else {
                    intent = new Intent(MainActivity.this, GameDActivity.class);
                    startActivity(intent);
                }
            }
        });

        //realm = Realm.getDefaultInstance();

        //scoresList = realm.where(Scores.class).findAll();

        //scoresAdapter = new ScoresAdapter(scoresList);
        //Context context = getApplicationContext();
        scoreRecycler = (RecyclerView) findViewById(R.id.rvScores);
        //scoreRecycler.setLayoutManager(new LinearLayoutManager(context, LinearLayoutManager.VERTICAL,false));
        //scoreRecycler.setAdapter(scoresAdapter);

        jsonArrayRequest();


/*
        scoresList.addChangeListener(new RealmChangeListener<RealmResults<Scores>>() {
            @Override
            public void onChange(RealmResults<Scores> score) {

                scoresAdapter.notifyDataSetChanged();
            }
        });*/

        btnLevel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(btnLevel.getText() == getString(R.string.btn_NivelF)){
                    btnLevel.setText(getString(R.string.btn_NivelN));
                }else if(btnLevel.getText() == getString(R.string.btn_NivelN)){
                    btnLevel.setText(getString(R.string.btn_NivelD));
                } else{
                    btnLevel.setText(getString(R.string.btn_NivelF));
                }
            }
        });

        btnCredits.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intentToCredits = new Intent(MainActivity.this, CreditsActivity.class);
                startActivity(intentToCredits);
            }
        });

    }

    private void jsonArrayRequest(){

        requestQueue = Volley.newRequestQueue(this);

        Response.Listener<JSONArray> respuesta = new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray response) {
                int size = response.length();
                for (int i = 0; i < size; i++) {
                    try {
                        JSONObject jsonObject = new JSONObject(response.get(i).toString());
                        String name = jsonObject.getString("name");
                        Integer score = jsonObject.getInt("score");
                        Scores punt = new Scores(score, name);
                        scoresList.add(punt);

                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
            }
        };
        Response.ErrorListener respuestaError = new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.e("Volley", error.getMessage());
            }
        };

        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(Request.Method.GET, URL, null, respuesta,respuestaError);


        requestQueue.add(jsonArrayRequest);
        generateRecycler(scoresList);
    }

    private void generateRecycler(ArrayList<Scores> list) {
        final ScoresAdapter scoresAdapter = new ScoresAdapter(list);
        scoreRecycler.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.VERTICAL,false));
        scoreRecycler.setAdapter(scoresAdapter);
        DividerItemDecoration mDividerItemDecoration = new DividerItemDecoration(scoreRecycler.getContext(), DividerItemDecoration.VERTICAL);
        scoreRecycler.addItemDecoration(mDividerItemDecoration);
    }

}