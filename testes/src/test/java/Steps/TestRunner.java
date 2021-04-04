package Steps;

import java.util.concurrent.TimeUnit;

import org.junit.After;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import io.cucumber.junit.CucumberOptions;
import io.cucumber.junit.Cucumber;



@RunWith(Cucumber.class)
@CucumberOptions(features = "src/test/resources/features",
glue = {"Steps"}, monochrome = true, 
plugin = {"pretty",
		"json:target/JSONReports/report.json", 
		"html:target/HtmlReports/report.html",
		"junit:target/XMLReports/report.xml" }, tags = "")

public class TestRunner {
	
}