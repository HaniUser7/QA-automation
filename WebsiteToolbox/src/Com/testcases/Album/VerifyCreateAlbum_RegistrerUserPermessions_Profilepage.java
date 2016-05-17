package Com.testcases.Album;

import java.awt.AWTException;
import java.io.IOException;

import org.openqa.selenium.By;
import org.testng.Assert;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.backendpages.UsersGroupPermissionspageObject;
import Com.frontendpages.AccountSettingsPageObjects;
import Com.testcases.Login.Frontendlogin;
import Com.testcases.UserPermission.VerifyStartTopic_CategoryPermissions;


//Verify back end  Create Album permissions Enable/Disable With Verify Front End Create Album from  Album Page, add Photo page for pending email users profile page 
@SuppressWarnings("deprecation")
public class VerifyCreateAlbum_RegistrerUserPermessions_Profilepage extends
		baseClass {
	String username, password, Filepath, Picturepath;

	public VerifyCreateAlbum_RegistrerUserPermessions_Profilepage()
			throws IOException {

		username=username("Album", 2, 1);
		password=password("Album", 2, 2);

		Filepath = readExcel("Album").getRow(2).getCell(3).getStringCellValue();

		Picturepath = readExcel("Album").getRow(2).getCell(4)
				.getStringCellValue();
   }

	// Disable Create Album settings from back end and verify Album on Profile page
	

	//@Test(priority = 0)
	public void VerifyDisableCreateAlbumsettingsfrombackend_verifyAlbumonProfile()
			throws InterruptedException, IOException {
		@SuppressWarnings("unused")
		AccountSettingsPageObjects Album = new AccountSettingsPageObjects();
		UsersGroupPermissionspageObject AlbumPermission = new UsersGroupPermissionspageObject();
		// Account user permission by checking Album for registered

		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
				AlbumPermission.Managelink_RegisteredUsers,
				AlbumPermission.ChangePermission_RegisteredUser,
				AlbumPermission.CreateAlbums_checkbox, false);

		Frontendlogin.loginToApp(username, password);
		Thread.sleep(3000);

		VerifyCreateAlbum();

		Thread.sleep(5000);
		Assert.assertFalse(verifyPresenceOfElement(By.id("uploadphotos")));
		Thread.sleep(5000);
		driver.navigate().back();

		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);

		driver.navigate().to((String) Credential.get("FrontendURL"));
	}

	// Enable Create Album Permissions from back end and verify create new album Through  Add Album image on profile page & Verify Added Image On Albums for Register Users

	//@Test(priority = 1)
	public void VerifyEnableCreateAlbumsettingsfrombackend_verifyAddPhotoONAlbum()
			throws InterruptedException, IOException, AWTException {
		AccountSettingsPageObjects Album = new AccountSettingsPageObjects();
		UsersGroupPermissionspageObject AlbumPermission = new UsersGroupPermissionspageObject();
		// Account user permission by checking Album for registered

		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
				AlbumPermission.Managelink_RegisteredUsers,
				AlbumPermission.ChangePermission_RegisteredUser,
				AlbumPermission.CreateAlbums_checkbox, true);
		Frontendlogin.loginToApp(username, password);
		Thread.sleep(3000);

		VerifyCreateAlbum();
		Thread.sleep(5000);
		attachfile(Album.AddPhotosButton, Filepath);
		Thread.sleep(5000);

		Album.PostPhotosButton.click();
		Thread.sleep(5000);
		driver.navigate().back();
		Thread.sleep(5000);
		Album.AddAlbumsButton.click();

		Assert.assertTrue(verifyPresenceOfElement(By.xpath(".//*[@id='upload_container']/div[2]/ul/li[1]/span[1]/a")));
		Thread.sleep(5000);
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);

		driver.navigate().to((String) Credential.get("FrontendURL"));
	}
	
	// Enable Create Album Permissions from back end and verify create new album Through  Add photo image on profile page  &  Verify Added Image On Albums for Register Users

		@Test(priority = 2)
		public void VerifyEnableCreateAlbumsettingsfrombackend_verifyAddPhotoONUnitedAlbum()
				throws InterruptedException, IOException, AWTException {
			AccountSettingsPageObjects Album = new AccountSettingsPageObjects();
			UsersGroupPermissionspageObject AlbumPermission = new UsersGroupPermissionspageObject();
			// Account user permission by checking Album for registered

			VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
					AlbumPermission.Managelink_RegisteredUsers,
					AlbumPermission.ChangePermission_RegisteredUser,
					AlbumPermission.CreateAlbums_checkbox, true);
			Frontendlogin.loginToApp(username, password);
			Thread.sleep(3000);

			VerifyCreateAlbum();
			Thread.sleep(5000);
			
			Album.AddAlbumsButton.click();
		
			attachfile(Album.AddPhotosButton, Filepath);
			Thread.sleep(5000);

			Album.PostPhotosButton.click();
			Thread.sleep(5000);
			driver.navigate().back();
			Thread.sleep(5000);
			driver.findElement(By.xpath("//li[@class='active']")).click();

			Assert.assertTrue(verifyPresenceOfElement(By.xpath(".//*[@id='upload_container']/div[2]/ul/li[1]/span[1]/a")));
			Thread.sleep(5000);
			Frontendlogin.logoutFromApp();
			Thread.sleep(3000);

			driver.navigate().to((String) Credential.get("FrontendURL"));
		}
		
		// Enable Create Album Permissions from back end and verify create new album Through add Image In United Album on profile page for Register Users &  Verify Added Image On Albums
		

		//@Test(priority = 3)
		public void VerifyEnableCreateAlbumsettingsfrombackend_verifyAddPhotoonProfilePage()
				throws InterruptedException, IOException, AWTException {
			AccountSettingsPageObjects Album = new AccountSettingsPageObjects();
			UsersGroupPermissionspageObject AlbumPermission = new UsersGroupPermissionspageObject();
			// Account user permission by checking Album for registered

			VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
					AlbumPermission.Managelink_RegisteredUsers,
					AlbumPermission.ChangePermission_RegisteredUser,
					AlbumPermission.CreateAlbums_checkbox, true);
			Frontendlogin.loginToApp(username, password);
			Thread.sleep(3000);

			VerifyCreateAlbum();
			Thread.sleep(5000);
			Album.AddAlbumsButton.click();
		    driver.findElement(By.xpath(".//*[@id='upload_container']/div[2]/ul/li/a")).click();
		    
			attachfile(Album.AddPhotosButton, Filepath);
			Thread.sleep(5000);

			Album.PostPhotosButton.click();
			Thread.sleep(5000);
			driver.navigate().back();
			Thread.sleep(5000);
			driver.findElement(By.xpath("//li[@class='active']")).click();

			Assert.assertTrue(verifyPresenceOfElement(By.xpath(".//*[@id='upload_container']/div[2]/ul/li[1]/span[1]/a")));
			Thread.sleep(5000);
			Frontendlogin.logoutFromApp();
			Thread.sleep(3000);

			driver.navigate().to((String) Credential.get("FrontendURL"));
		}
	

	public static void VerifyCreateAlbum() throws InterruptedException {
		AccountSettingsPageObjects Album = new AccountSettingsPageObjects();
		Album.Signoutbuttondropdown.click();
		Album.Profile.click();
		Thread.sleep(5000);
	}
	
}
