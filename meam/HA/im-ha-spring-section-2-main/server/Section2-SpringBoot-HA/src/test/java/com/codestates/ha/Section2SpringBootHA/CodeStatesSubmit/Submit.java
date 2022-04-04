package com.codestates.ha.Section2SpringBootHA.CodeStatesSubmit;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.*;

public class Submit {

    private int passes;

    public void ResultSubmit() throws Exception{
        String stringbuffer = null;
        Process process = null;

        try {
            String[] install = {"/bin/sh","-c", "cd submit && npm install"};
            String[] submit = {"/bin/sh","-c", "cd submit && node submitResult.js"};

            ProcessRun(stringbuffer, process, install);
            ProcessRun(stringbuffer, process, submit);

        } catch (Exception e) {
            System.out.println("Error : " + e);
        }
    }

    public void ProcessRun(String stringbuffer, Process process, String[] cmd) throws Exception{
        process = Runtime.getRuntime().exec(cmd);
        BufferedReader br = new BufferedReader(new InputStreamReader(process.getInputStream()));

        while ((stringbuffer = br.readLine()) != null){
            System.out.println(stringbuffer);
        }

        process.waitFor();

        System.out.println("exit: " + process.exitValue());
        process.destroy();
    }

    public void ResultSave(Boolean result){
        if(result){
            passes++;
        }
    }

    public void SubmitJson(String projectName, int testcount) throws IOException {
        Result result = new Result();
        result.setName(projectName);
        result.setTests(testcount);
        result.setPasses(passes);
        result.setPending(0);
        result.setFailures(testcount-passes);

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.writeValue(new File("./submit/junitResult.json"), result);
    }
}