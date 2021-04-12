package Utilities;

import java.util.ArrayList;
import java.util.List;

import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class DSL {
	WebDriver driver;
	WebDriverWait wait;
	
	
	public DSL(WebDriver driver) {
		this.driver = driver;
		wait = new WebDriverWait(driver, 30);
	}

	public void clico(By by) {
		esperoPoderClicar(by);
		driver.findElement(by).click();
	}

	public void escrevo(By by, String texto) {
		driver.findElement(by).clear();
		driver.findElement(by).sendKeys(texto);
	}

	public String leio(By by, String atributo) {
		return driver.findElement(by).getAttribute(atributo);
	}

	public String leio(By by) {
		return driver.findElement(by).getText();
	}

	public List<WebElement> retornoListaDeElementos(By by) {
		return driver.findElements(by);
	}

	public List<String> retornoListaDeTexto(List<WebElement> elements) {
		List<String> lista = new ArrayList<String>();
		for (WebElement item : elements) {
			lista.add(item.getText());
		}
		return lista;
	}

	public boolean vejo(By by) {
		return driver.findElement(by).isDisplayed();		
	}

	public void esperoEstarVisivel(By by) {
		wait.until(ExpectedConditions.visibilityOfElementLocated(by));		
	}

	public void esperoPoderClicar(By by) {
		wait.until(ExpectedConditions.elementToBeClickable(by));
	}

	public void esperoDesaparecer(By by) {
		wait.until(ExpectedConditions.invisibilityOfElementLocated(by));
	}

	public WebElement retornoElemento(By by) {
		return driver.findElement(by);
	}

	public void ScrolloAteElemento(By by) {
		JavascriptExecutor je = (JavascriptExecutor) driver;
		esperoEstarVisivel(by);
		je.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(by));
	}
}
